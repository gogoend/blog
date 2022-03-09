function handwave() {
    const StatusEnum = {
        CLOSED: 'CLOSED',
        FIN_WAIT_1: 'FIN_WAIT_1',
        FIN_WAIT_2: 'FIN_WAIT_2',
        TIME_WAIT: 'TIME_WAIT',
        CLOSE_WAIT: 'CLOSE_WAIT',
        LAST_ACK: 'LAST_ACK',
        ESTABLISHED: 'ESTABLISHED'
    }
    
    let server = {
        status: StatusEnum.ESTABLISHED,
        isn: Math.round(Math.random()*100),
        seq: null,
        ack: null
    }
    let client = {
        status: StatusEnum.ESTABLISHED,
        isn: Math.round(Math.random()*100),
        seq: null,
        ack: null
    }

    function* open() {
        console.log(`服务端状态为${server.status}`)
        console.log(`准备挥手`, client, server)
        yield 0
        console.log('--- 第一次挥手开始 ---')
        client.seq = client.isn
        console.log(`客户端给服务端发FIN报文，客户端序列号为${client.seq}`)
        client.status = StatusEnum['FIN_WAIT_1']
        console.log(`客户端状态变为${client.status}`)
        console.log('--- 第一次挥手结束 ---', client, server)
        yield 1
        console.log('--- 第二次挥手开始 ---')
        server.status = StatusEnum['CLOSE_WAIT']
        console.log(`服务端收到客户端FIN报文，状态变为${client.status}`)
        server.ack = client.isn + 1
        server.seq = server.isn
        console.log(`服务端给客户端发ACK报文，应答号为${server.ack}，服务端序列号为${server.seq}`)
        console.log('--- 第二次挥手结束 ---', client, server)

        yield 2
        client.status = StatusEnum['FIN_WAIT_2']
        console.log(`客户端收到服务端ACK报文，状态变为${client.status}`)
        console.log('--- 第二次挥手结束后，第三次挥手开始前，可能有数据没有传输完成；因此服务端seq可能会增加，isn也更新一下 ---')
        server.isn = Math.round(Math.random() * 200) + server.seq
        console.log('--- 此处模拟这种情况 ---', client, server)
        
        console.log('--- 第三次挥手开始 ---')
        server.status = StatusEnum['LAST_ACK']
        console.log(`数据传输结束后，服务端向客户端发送FIN报文，状态变为${server.status}`)
        server.seq = server.isn
        server.ack = client.isn + 1
        console.log('--- 第三次挥手结束 ---', client, server)

        yield 3
        console.log('--- 第四次挥手开始 ---')
        client.status = StatusEnum.TIME_WAIT
        console.log(`客户端收到服务端FIN报文，状态变为${client.status}`)
        client.seq = client.isn + 1
        client.ack = server.isn + 1
        console.log('--- 第四次挥手结束 ---', client, server)
        yield 4

        setTimeout(() => client.status = StatusEnum.CLOSED, 500)
        server.status = StatusEnum.CLOSED

    }

    const instance = open()
    instance.next()
    return instance
}
