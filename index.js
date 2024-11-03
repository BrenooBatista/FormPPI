import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

var listaProdutos = [];

function cadastroProduto(req, resp){
    resp.send(`
            <html>
                <head>
                    <title>Cadastro de Produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container text-center">
                    <h1 class="mb-3">Cadastro de Produtos</h1>
                    <form method="POST" action="/cadastrarProduto" class="border p-3 row g-3" novalidate>
                        <div class="col-md-4">
                            <label for="nome" class="form-label">Produto</label>
                            <input type="text" class="form-control" id="nome" name="nome" placeholder="Digite o nome do produto" required>
                            </div>
                            <div class="col-md-4">
                                <label for="categoria" class="form-label">Categoria</label>
                                <input type="text" class="form-control" id="categoria" name="categoria" placeholder="Digite a categoria do produto" required>
                            
                            </div>
                            <div class="col-md-4">
                            <label for="tag" class="form-label">Tag</label>
                            <div class="input-group has-validation">
                                <input type="number" class="form-control" id="tag" name="tag" placeholder="Digite o número da tag" required>
                             </div>
                        </div>
                <div class="col-md-3 mx-auto" >
                    <label for="quantidade" class="form-label">Quantidade</label>
                    <input type="number" class="form-control" id="" name="quantidade" required>
                </div>
                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                </div>
                </form>
                    </div>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
        `);
}

function menu(req, resp){
    resp.send(`
            <html>
                <head>
                    <title>Cadastro de Produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                </head>
                <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">MENU</a>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="/cadastrarProduto">Cadastrar Produtos</a>
                        </div>
                </div>
                </nav>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
            </html>
        `);
}

function cadastrarProduto(req, resp) {
    const nome = req.body.nome;
    const categoria = req.body.categoria;
    const tag = req.body.tag;
    const quantidade = req.body.quantidade;

    const produto = { nome, categoria, tag, quantidade };
    
    listaProdutos.push(produto);
    
    resp.write(`
        <html>
            <head>
                <title>Produtos Cadastrados</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                <meta charset="utf-8">
            </head>
            <body>
            <div class="container">
                <h1 class="mb-3">Produtos Cadastrados</h1>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Tag</th>
                            <th scope="col">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
    `);
    
    for (var i = 0; i < listaProdutos.length; i++) {
        resp.write(`
            <tr>
                <td>${listaProdutos[i].nome}</td>
                <td>${listaProdutos[i].categoria}</td>
                <td>${listaProdutos[i].tag}</td>
                <td>${listaProdutos[i].quantidade}</td>
            </tr>
                 `);
    }

    resp.write(`
                    </tbody>
                </table>
                <a class="btn btn-warning" href="/cadastrarProduto" role="button">Continuar Cadastro</a>
                <a class="btn btn-secondary" href="/" role="button">Menu</a>
            </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);

    resp.end();
}


app.get('/',menu);
app.get('/cadastrarProduto', cadastroProduto);
app.post('/cadastrarProduto',cadastrarProduto);
app.listen(porta, host, () => {
    console.log('Servidor iniciado e em execução no endereço http://${host}:${porta}');
});