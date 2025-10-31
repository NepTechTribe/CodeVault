/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        if (head == null) {
            return null;
        }
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        ListNode t = head;

        while (t != null) {
            if (t.next != null && t.val == t.next.val) {
                while (t.next != null && t.val == t.next.val) {
                    t = t.next;
                }
                prev.next = t.next;
            } else {
                prev = prev.next;
            }
            t = t.next;
        }
        return dummy.next;
    }
}
