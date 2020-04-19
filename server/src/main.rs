#[macro_use]
extern crate diesel;

use log::info;

use actix_cors::Cors;
use actix_identity::{CookieIdentityPolicy, IdentityService};
use actix_web::{middleware, web, App, HttpServer};

use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

mod auth_handler;
mod errors;
mod models;
mod schema;
mod utils;
mod register_handler;

use crate::models::AppState;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    // std::env::set_var(
    //     "RUST_LOG",
    //     "server=debug,actix_web=debug,actix_server=debug",
    // );

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: models::Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    let domain: String = std::env::var("DOMAIN").unwrap_or_else(|_| "localhost:3000".to_string());
    let port: String = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let host = format!("localhost:{}", port);

    env_logger::from_env(env_logger::Env::default().default_filter_or("info")).init();

    info!("Starting server at http://{}", host);

    HttpServer::new(move || {
        App::new()
            .data(AppState { pool: pool.clone() })
            .wrap(middleware::Logger::default())
            .wrap(IdentityService::new(
                CookieIdentityPolicy::new(utils::SECRET_KEY.as_bytes())
                    .name("auth-cookie")
                    .max_age_time(chrono::Duration::hours(1))
                    .secure(false), // this can only be true if you have https
            ))
            .data(web::JsonConfig::default().limit(4096))
            .wrap(Cors::new().max_age(3600).finish())
            .service(
                web::scope("/api")
                    .service(
                        web::resource("/auth")
                            .route(web::post().to(auth_handler::login))
                            .route(web::get().to(auth_handler::get_me))
                            .route(web::delete().to(auth_handler::logout)),
                    )
                    .service(
                        web::resource("/register")
                            .route(web::post().to(register_handler::register_user)),
                    ),
            )
    })
    .bind(host)?
    .run()
    .await
}
