all: s3.js
s3.js: src/main.l s2.js
	node s2.js src/main.l > $@
	chmod +x $@

s2.js: src/main.l bin/s2-stable.js
	node bin/s2-stable.js src/main.l > $@
	chmod +x $@

.PHONY: s2.js clean

clean:
	rm -f s{2,3}.js *~ */*~
