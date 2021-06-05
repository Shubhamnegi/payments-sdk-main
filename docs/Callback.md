# Callback And Webhooks

## Callback
On sucess or failure the payment vendor return the response in the form of redirects. The url will be our systems url. Our system will hanle the callback by figuring out the payment vendor and run callback handling job and later redirect to the client. 

The handling process will also send a webhook to the clinet to reduce changes of missing the order status at client.

This follows factory pattern where vendor will be decied by the url.

## Webhook

Most of the vendors provide a method to send events. Our system will be responsible for handling those events. Again this will be factory pattern which will decide the vendor by url end point.

The handling process will also send a webhook to the clinet to reduce changes of missing the order status at client.