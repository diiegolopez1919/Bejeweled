const express = require('express');

const router = express.Router();

router.get('/cart', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT * FROM cart;',(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.get('/idPedido', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT max(idPedido) FROM cart;',(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.post('/cart', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('INSERT INTO cart set ?', [req.body] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.delete('/cart/:idCart', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('DELETE FROM cart WHERE idCart= ?', [req.params.idCart] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.put('/cart/:idCart', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('UPDATE cart set ? WHERE idCart = ?', [req.body, req.params.idCart] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

module.exports = router;