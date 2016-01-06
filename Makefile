all: s2.js b6.js

s2.js: bin/s2-stable.js src/main.l 
	node bin/s2-stable.js src/main.l > $@
	chmod +x $@

s3.js: s2.js src/main.l 
	node s2.js src/main.l > $@
	chmod +x $@

s4.js: s3.js src/main.l 
	node s3.js src/main.l > $@
	chmod +x $@

b6.js: bin/s2-stable.js example/browser.l
	node bin/s2-stable.js example/browser.l | tail -n +2  > $@

b7.js: s4.js example/browser.l
	node s3.js example/browser.l | tail -n +2  > $@

.PHONY: b6.js b7.js s2.js s3.js clean stable test

clean:
	rm -f s{2,3,4}.js b{6,7}.js *~ */*~

stable: s2.js
	cp s2.js bin/s2-stable.js

browser: b6.js
	cp b6.js example/b6.js

test: b7.js
