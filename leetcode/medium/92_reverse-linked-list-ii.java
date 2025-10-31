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

    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left == right) {
            return head;
        }

        List<Integer> values = new ArrayList<>();
        ListNode traverse = head;
        int position = 1;

        while (traverse != null) {
            if (position >= left && position <= right) {
                values.add(traverse.val);
            }
            traverse = traverse.next;
            position++;
        }

        Collections.reverse(values);

        traverse = head;
        position = 1;
        int index = 0;

        while (traverse != null) {
            if (position >= left && position <= right) {
                traverse.val = values.get(index++);
            }

            traverse = traverse.next;
            position++;
        }
        return head;
    }
}
