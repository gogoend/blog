class ListNode<T> {
  constructor(public val?: T, public next?: ListNode<T> | null) {
  }
}

const getLinkFromArray = <T>(arr: T[]) =>{
  let link: ListNode<T>
  let current: ListNode<T> | null = null
  arr.forEach((item,index)=>{
      if (!link) {
          link = new ListNode(item,arr[index + 1])
          current = link
      } else {
          current.next = new ListNode(item,arr[index + 1])
          current = current.next
      }
  }
  )
  return link
}

const getArrayFromLink = <T>(head: ListNode<T>) => {
  const arr: T[] = []
  while(head) {
      arr.push(head.val)
      head = head.next
  }
  
  return arr
}