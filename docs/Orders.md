# Orders

All the order in the system should be unique irrespective of the business unit. This is required as in some casses payment vendor will not share any other detail expect order id which will make it difficult to find correct order in case there are conflicting orders.

## Order update rules

- Order will be updated in the system as soon as the first request arrives
- This order will be marked with initiated state.
- The end user needs to share a callback and webhook url, this can also be configured at integtation level if we do not want to send this every time
- On callback order webhook from the payment vendor system will use get transaction status api to get current state and update the database
- Implmentation on pending order needs to be figured out.
- On callback system will redirect to the callback url shared earlier and also share status on webhook url
- On webhook from from vendor, status will be shared with user using webhook url shared by user 
- Order will be updated to failed or success state on callback and webhook
- Once recieved failed, the order stays in failed state. In case a success event is shared by the vendor at a later state, an auto refund will be inititated