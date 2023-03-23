const express = require('express');

const router = express.Router();

router.get('/venta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT * FROM venta;',(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.get('/venta/:idVenta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT * FROM venta WHERE idVenta = ?;',[req.params.idVenta],(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.get('/venta/maxIdPedido/:idUsuario', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT max(idPedido) as maxIdPedido FROM venta WHERE idUsuario = ?;',[req.params.idUsuario],(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.post('/venta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('INSERT INTO venta set ?', [req.body] ,(err, rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
    })
});

router.delete('/venta/:idVenta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('DELETE FROM venta WHERE idVenta = ?', [req.params.idVenta] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.put('/venta/:idVenta', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('UPDATE venta set ? WHERE idVenta = ?', [req.body, req.params.idVenta] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

module.exports = router;