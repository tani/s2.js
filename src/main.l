(ir::include "src/libstd.l")
(ir::include "src/read.l")
(ir::include "src/compile.l")
(ir::include "src/precompile.l")

(defun transpile (str)
  (let ((code (read str)))
    (let ((expanded (precompile code)))
      (let ((js (compile expanded)))
	(return-from transpile js)))))

(defun main ()
  (let ((fs (require 'fs))
	(file (nth (.-argv process) (- (.-length argv process) 1)))
	(config "#!/usr/bin/env node\n"))
    (let ((src (.readFileSync fs file 'utf-8)))
      (.log console (transpile (+ "(ir::function () (ir::block" src "))"))))))

(main)
