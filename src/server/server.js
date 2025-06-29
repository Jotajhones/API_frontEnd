export async function server(app) {
    const port = 8080;

    app.listen(port, () => {
        console.log(`> Server disponivel na porta: http://localhost:${port}`)
    });
}
