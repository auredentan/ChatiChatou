
FROM ekidd/rust-musl-builder:latest as builder
ADD . ./
RUN sudo chown -R rust:rust /home/rust
RUN cargo build --release

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=builder /home/rust/src/target/x86_64-unknown-linux-musl/release/twitch-clone /usr/local/bin/twitch-clone
EXPOSE 8080
CMD ["/usr/local/bin/twitch-clone"]