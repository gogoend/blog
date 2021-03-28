/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let temp = result = new ListNode('head')
    let carry = 0,sum=0
    while(l1 || l2){
        sum = (l1?l1.val:0) + (l2?l2.val:0) + carry
        if(sum>=10){
            carry = 1
            sum = sum%10
        }else{
            carry = 0
        }
        temp.next = new ListNode(sum)
        temp = temp.next
        l1 && (l1 = l1.next)
        l2 && (l2 = l2.next)
    }
    return result.next
};
// @lc code=end

