# s2.js
LISP to JavaScript. Self-hosting.

In the webpage...

```
<script type="text/javascript" src="b6.js"></script>
```

Now You can write any lisp code in your browser!

```
<script type="text/lisp">
      (defun func ()
        (let ((src (.-value (.getElementById document "src"))))
           (eval (transpile (+ "(lambda ()" src ")")))))
      (let ((btn (.getElementById document "btn")))
        (set (.-onclick btn) func))
</script>
```

Happy hacking!

## Copyright

Copyright (c) 2017 All Rights Reserved.

## License

MIT
