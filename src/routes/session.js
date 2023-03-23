const express = require('express');

const router = express.Router();

router.get('/session', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT * FROM sesion;',(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.post('/session', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('INSERT INTO sesion set ?', [req.body] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.delete('/session/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('DELETE FROM sesion WHERE idUsuario = ?', [req.params.idUsuario] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.put('/session/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('UPDATE sesion set ? WHERE idUsuario = ?', [req.body, req.params.idUsuario] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

module.exports = router;