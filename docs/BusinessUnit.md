# Business Unit

Business units are contolled by subsciption plan which user is mapped to. A business unit can be an actul buniess of the user. This is to segregate orders on the basis of business. This can later help in reporting. 
Another example of busines unit is to segregate orders by brand or outlets

SDK will ask all user to create a business unit before selecting integrations.

Once user has selected a business unit he/she can select integration/payment gateway and enter credentials

This will create bu-integration in db with mapping to business unit and integation. 

## Sample structure

- Subscriber - user@email.com
- Business Unit - Company A
- Selected integration Paytm mapped to company A  with mid and secret