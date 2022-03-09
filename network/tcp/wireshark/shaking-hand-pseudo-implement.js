function shakeHand() {
    const StatusEnum = {
        CLOSED: 'CLOSED',
        LISTEN: 'LISTEN',
        'SYN-SENT': 'SYN-SENT',
        'SYN-RCVD': 'SYN-RCVD',
        ESTABLISHED: 'ESTABLISHED'
    }
    
    let server = {
        status: StatusEnum.CLOSED,
        isn: Math.round(Math.random()*100),
        seq: null,
        ack: null
    }
    let client = {
        status: StatusEnum.CLOSED,
        isn: Math.round(Math.random()*100),
        seq: null,
        ack: null
    }

    function* open() {
        server.status = StatusEnum.LISTEN
        console.log(`服务端状态为${server.status}`, client, server)
        yield 0
        console.log('--- 第一次握手开始 ---')
        client.seq = client.isn
        console.log(`客户端给服务端发SYN报文，客户端序列号为${client.seq}`)
        client.status = StatusEnum['SYN-SENT']
        console.log(`客户端状态变为${client.status}`)
        console.log('--- 第一次握手结束 ---', client, server)
        yield 1
        console.log('--- 第二次握手开始 ---')
        server.status = StatusEnum['SYN-RCVD']
        console.log(`服务端收到客户端SYN报文，状态变为${client.status}`)
        server.ack = client.isn + 1
        server.seq = server.isn
        console.log(`服务端给客户端发SYN + ACK报文，应答号为${server.ack}，服务端序列号为${server.seq}`)
        console.log('--- 第二次握手结束 ---', client, server)
        yield 2
        console.log('--- 第三次握手开始 ---')
        client.status = StatusEnum.ESTABLISHED
        console.log(`客户端收到服务端SYN + ACK报文，状态变为${client.status}`)
        client.seq = client.isn + 1
        client.ack = server.isn + 1
        console.log(`客户端给服务端发SYN + ACK报文，应答号为${client.ack}，客户端序列号为${client.seq}`)
        console.log('--- 第三次握手结束 ---', client, server)
        yield 3
        server.status = StatusEnum.ESTABLISHED
        console.log(`服务端收到客户端ACK报文，状态变为${server.status}`, client, server)
    }

    const instance = open()
    instance.next()
    return instance
}
