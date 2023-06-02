const express = require("express")
const uuid = require("uuid")

const port = 4001
const app = express()
app.use(express.json())

const orders = []

const checkOrderId = (req, res, next) => {
    const { id } = req.params

    const index = orders.findIndex(purchaseOrder => purchaseOrder.id == id)

    if (index <0) {
        return res.status(404).json({error: 
        "user not found"})
    }

    req.ordenIndex = index 
    req.orderId =id

    next()
}

const methodurl = (req, res, next) => {
    console.log("request type:", req.method)
    console.log("request URL:", req.originalUrl)

    next()
}

app.post("/orders", methodurl, (req, res) => {
    const { order, clientname, price } =req.body
    const purchaseOrder = {id: uuid.v4(), order, clientname, price, status: "em preparação"}

    orders.push(purchaseOrder)

    return res.status(201).json(purchaseOrder)
})

app.put("orders/:id", checkOrderId, methodurl,(req, res) => {
    const{order, clientname, price} = req.body
    const index = req.ordenIndex
    const id = req.orderId

    const updateorder = {id, order, clientname, price, status:"em preparação"}

    orders[index] = updateorder

    return res.json(updateorder)
})

app.delete("/orderrs/:id", checkOrderId, methodurl, (req, res)=> {
    const index = req.ordenIndex
    
    orders.splice(index, 1)
    return res.status(204).json()
})

app.get("orders/:id", checkOrderId, methodurl,(req, res) => {
    const index = req.ordenIndex
    const purchaseOrder = ordenIndex

    return res.json(purchaseOrder)
})

app.patch("orders/:id", checkOrderId, methodurl,(req, res) => {
    const index = req.ordenIndex
    const purchaseOrder = ordenIndex

    purchaseOrder.status = "pronto"

    return res.json(purchaseOrder)
})


app.listen(port, () => {
    console.log(`server started on port ${port}`)
})

/*
- query params => meusite.com/users?nome=danilo/7age=28 // filtros
- route params => /users/2 //buscar deletar algo especifico

-- get   => busca informaçoes do back-end
- post   => criar informaçoes do back-end
- put / patch => alterar / atualização informaçoes no bach-end
- delete  => deletar informaçoes do back-end
*/


