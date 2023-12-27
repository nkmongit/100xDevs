# AUTHENTICATION, JWTs AND TRY/CATCH

`Will understand this using a real world example`

To open an account in bank.

1. Goes to bank.
2. Deposits some money in the bank.
3. Gets back a cheque book from bank.

Whenever we have to pay someone.

1. Sign the cheque.
2. Everyone can see the sign.
3. People can try to do the same sign on their cheque book.
4. Bank won't accept theirs, will only accept my cheque.

cheque book == json web token

`SIMILARLY`

Whenever we signin on ChatGPT

1. Signin (sending username and password).
2. Gets back a `JWT token` back from the ChatGPT backend.
3. That token is verified with password that's only in the backend.
4. So whenever we are requesting back to the server, the server can verify us with the same `token`.

```text
JSON Web Tokens are just like these cheques.
They are issued by the backend when you sign in.
Anyone can create something very similar, but the backend would reject it.
If you lose the original JWT, then it is a problem.
```

![JWT example on ChatGPT](/images/info.png)

## Understand JWT

1. Generate

   - Generating means, a JWT token gets generated with the password that only server has, or with simple language bank issuing a cheque book.

   ```js
   const contents = {
     name: 'nishant',
     accNum: 123123,
     iat: 178,
   };
   const token = jwt.sign(contents, 'secret', { expiresIn: '1h' });

   // generated token
   /*
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
     .eyJuYW1lIjoibmlzaGFudCIsImFjY051bSI6MTIzMTIzLCJpYXQiOjE3MDM1OTkyODR9
     .ouJylwu7eEuvFILWGn2R0Z11xHo4M6eKeSyRxQjL7JI
    */
   ```

2. Decoding

   - Decoding can be done by anyone, and the info can be seen by anyone.![JWT Decoding]([/images/JWT%20Decode.png](https://github.com/nkmongit/100xDevs/blob/main/Week%203.3%20-%20JWT%20and%20Auth%20Recap/images/JWT%20Decode.png))

   ```js
   const decodedJWT = jwt.decode(token);
   ```

3. Verifying

   - Verification can only be done on the server, because the JWT token, gets verified with a password which only server has of signed with that password only.

   ```js
   const check = jwt.verify(token, jwtPassword);
   ```

## Try and Catch

- Throwing and catching errors in JS

```js
function getLength(name) {
  return name.length;
}

try {
  const ans = getLength();
  console.log(ans);
} catch (e) {
  console.log("Can't get length of undefined");
}

console.log('CONTROL REACHES HERE');
```
