all: s3.js

s3.js: s2.js src/main.l 
	node s2.js src/main.l > $@
	chmod +x $@

s2.js: bin/s2-stable.js src/main.l 
	node bin/s2-stable.js src/main.l > $@
	chmod +x $@

b6.js: bin/s2-stable.js example/browser.l
	node bin/s2-stable.js example/browser.l | tail -n +2 | tr -d '\n' > example/$@

.PHONY: b6.js s2.js clean stable

clean:
	rm -f s{2,3}.js *~ */*~

stable: s2.js
	cp s2.js bin/s2-stable.js
