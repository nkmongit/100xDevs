use actix_web::{web, App, HttpServer, Responder};

async fn index() -> impl Responder {
    "Hello, Actix-Web!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Start HTTP server
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
    })
    .bind("127.0.0.1:8080")? // Bind the server to this address
    .run()
    .await
}
