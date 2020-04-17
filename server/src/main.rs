#[macro_use]
extern crate diesel;

use crate::models::AppState;
use actix_cors::Cors;
use actix_identity::{CookieIdentityPolicy, IdentityService};
use actix_web::{middleware, web, App, HttpServer};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};

mod auth_handler;
// mod email_service;
mod errors;
// mod invitation_handler;
mod models;
// mod register_handler;
mod schema;
mod utils;
use slog::info;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var(
        "RUST_LOG",
        "simple-auth-server=debug,actix_web=info,actix_server=info",
    );

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: models::Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");
    let domain: String = std::env::var("DOMAIN").unwrap_or_else(|_| "localhost:3000".to_string());

    let log = utils::configure_log();
    env_logger::init();
    info!(log, "Starting server at http://localhost:8080");

    HttpServer::new(move || {
        App::new()
            .data(AppState {
                pool: pool.clone(),
                log: log.clone(),
            })
            .wrap(Cors::new().max_age(3600).finish())
            .wrap(middleware::Logger::default())
            .wrap(IdentityService::new(
                CookieIdentityPolicy::new(utils::SECRET_KEY.as_bytes())
                    .name("auth")
                    .domain(domain.as_str())
                    .max_age_time(chrono::Duration::days(1))
                    .secure(false), // this can only be true if you have https
            ))
            .data(web::JsonConfig::default().limit(4096))
            .service(
                web::scope("/api").service(
                    web::resource("/auth")
                        .route(web::post().to(auth_handler::login))
                        .route(web::get().to(auth_handler::get_me))
                        .route(web::delete().to(auth_handler::logout)),
                ),
            )
    })
    .bind("localhost:8080")?
    .run()
    .await
}
