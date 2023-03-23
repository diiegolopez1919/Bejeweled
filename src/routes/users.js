const express = require('express');

const router = express.Router();

router.get('/users', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT * FROM usuarios;',(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.post('/users', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('INSERT INTO usuarios set ?', [req.body] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.delete('/users/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('DELETE FROM usuarios WHERE idUsuario = ?', [req.params.idUsuario] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.put('/users/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('UPDATE usuarios set ? WHERE idUsuario = ?', [req.body, req.params.idUsuario] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

module.exports = router;