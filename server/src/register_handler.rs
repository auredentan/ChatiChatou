use actix_web::{error::BlockingError, web, HttpResponse};
use diesel::prelude::*;
use serde::Deserialize;

use crate::errors::ServiceError;
use crate::models::{AppState, Pool, SlimUser, User};
use crate::utils::hash_password;

// UserData is used to extract data from a post request by the client
#[derive(Debug, Deserialize)]
pub struct UserData {
    pub email: String,
    pub password: String,
}

pub async fn register_user(
    user_data: web::Json<UserData>,
    state: web::Data<AppState>,
) -> Result<HttpResponse, ServiceError> {
    let pool = state.pool.clone();
    let user_data = user_data.into_inner();
    println!("there");
    let res = web::block(move || {
        query(
            user_data.email,
            user_data.password,
            pool,
        )
    })
    .await;
    println!("after {:?}", res);

    match res {
        Ok(user) => Ok(HttpResponse::Ok().json(&user)),
        Err(err) => match err {
            BlockingError::Error(service_error) => Err(service_error),
            BlockingError::Canceled => Err(ServiceError::InternalServerError),
        },
    }
}

fn query(
    email: String,
    password: String,
    pool: Pool,
) -> Result<SlimUser, crate::errors::ServiceError> {
    use crate::schema::users::dsl::users;

    let conn: &PgConnection = &pool.get().unwrap();

    let password: String = hash_password(&password)?;
    dbg!(&password);
    let user = User::from_details(email, password);
    let inserted_user: User = diesel::insert_into(users).values(&user).get_result(conn)?;
    dbg!(&inserted_user);
    return Ok(inserted_user.into());
}