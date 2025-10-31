class Solution {

    public ListNode mergeKLists(ListNode[] lists) {
        int len = lists.length;
        if (len == 0) return null;

        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;

        for (ListNode list : lists) {
            while (list != null) {
                int val = list.val;
                max = Math.max(max, val);
                min = Math.min(min, val);
                list = list.next;
            }
        }

        int range = max - min + 1;
        ListNode bucketList[] = new ListNode[range];

        for (ListNode list : lists) {
            while (list != null) {
                ListNode nextNode = list.next;

                int bucketIdx = list.val - min;
                list.next = bucketList[bucketIdx];
                bucketList[bucketIdx] = list;

                list = nextNode;
            }
        }

        ListNode newHead = new ListNode(0);
        ListNode dummy = newHead;

        for (ListNode list : bucketList) {
            dummy.next = list;

            while (dummy.next != null) {
                dummy = dummy.next;
            }
        }

        return newHead.next;
    }
}
