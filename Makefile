all: s2.js

s2.js: src/s2.l bin/s2-stable.js
	node bin/s2-stable.js src/s2.l > $@
	chmod +x $@

.PHONY: s2.js clean

clean:
	rm -f lisp.l s2.js *~ */*~
