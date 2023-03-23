const express = require('express');

const router = express.Router();

router.get('/shipping', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('SELECT * FROM shipping;',(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.post('/shipping', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('INSERT INTO shipping set ?', [req.body] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.delete('/shipping/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('DELETE FROM shipping WHERE id = ?', [req.params.id] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

router.put('/shipping/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);

        conn.query('UPDATE shipping set ? WHERE id = ?', [req.body, req.params.id] ,(err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

module.exports = router;