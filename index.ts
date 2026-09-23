//            BANCO DE DADOS     HTTP
// [C]reat    insert             post
// [R]read    select             get
// [U]pdate   update             put
// [U]pdate   update             patch
// [D]elete   delete             delete

import { db } from "./db"

const srv = Bun.serve({
    port: 3000,
    routes: {
        "/user": {
            GET: () => {
                const query = db.query(`SELECT * FROM users`)
                const data = query.all()
                return Response.json(data)
            },

            POST: async (req) => {
                const body = await req.body.json()
                const query = db.query(`
                    INSERT INTO users(username, email, password_hash)
                    VALUES(:username, :email, :password_hash)
                `)
                const dbResp = query.run({
                    ':username': body.username,
                    ':email': body.email,
                    ':password_hash': body.password
                })
                return Response.json({
                    "message": "deu boa garote!",
                    dbResp
                })
            },
        },

        "/user/:id": {
            GET: (req) => {
                const id = req.params.id
                const query = db.query(`SELECT * FROM users WHERE id=:id`)
                const data = query.get({ ':id': id })
                return Response.json(data)
            },

            PUT: async (req) => {
                const body = await req.body.json()
                const query = db.query(`
                    UPDATE users SET 
                    username = :username, 
                    email = :email, 
                    password_hash = :password 
                    WHERE id = :id
                    `)
                    
                const dbResp = query.run({
                    ':username': body.username,
                    ':email': body.email,
                    ':password': body.password,
                    ':id': req.params.id
                })
                return Response.json(dbResp)
            },

            DELETE: (req) => {
                const query = db.query(`DELETE FROM users WHERE id=:id`)
                const data = query.run({ ':id': req.params.id })
                return Response.json(data)
            },
        },

        "/ficha": {
            GET: () => {
                const query = db.query(`SELECT * FROM fichas`)
                const data = query.all()
                return Response.json(data)
            },

            POST: async(req) => {
                const body = await req.body.json()
                const query = db.query(`
                    INSERT INTO ficha(id, PV, PE, nome, classe, habilidades)
                    VALUES(:PV, :PE, :classe, habilidades)
                `)
                const dbResp = query.run({
                    ':id': body.id,
                    ':PV': body.PV,
                    ':PE': body.PE,
                    ':nome': body.nome,
                    ':classe': body.classe,
                    ':habilidade': body.habilidade
                })
                return Response.json({
                    "message": "deu boa garotex!",
                    dbResp
                })
            },

        },

        "/ficha/:id": {
            GET: (req) => { 
            const id = req.params.id
                const query = db.query(`SELECT * FROM ficha WHERE id=:id`)
                const data = query.get({ ':id': id })
                return Response.json(data)
        },

            PUT: async (req) => {
                const body = await req.body.json()
                const query = db.query(`
                UPDATE ficha SET 
                habilidade = :habilidade, 
                classe = :classe, 
                nome = :nome, 
                PV = :PV, 
                PE = :PE 
                WHERE id = :id
                `)

                const dbResp = query.run({
                    ':nome': body.nome,
                    ':PV': body.PV,
                    ':PE': body.PE,
                    ':habilidade': body.habilidade,
                    ':classe': body.classe,
                    ':id': req.params.id
                })
                return Response.json(dbResp)
            },

            DELETE: (req) => {
                const query = db.query(`DELETE FROM ficha WHERE id=:id`)
                const data = query.run({ ':id': req.params.id })
                return Response.json(data)
            },
        },
    }
})