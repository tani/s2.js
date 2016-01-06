(ir::include "src/libstd.l")
(ir::include "src/read.l")
(ir::include "src/compile.l")

(defmacro init ()
  (let ((fs (require 'fs)))
    (let ((src (.readFileSync fs "src/libstd.l")))
      (return-from init
	(+ "\"" (.replace (String src) (RegExp "\\r?\\n" "g") "") "\"")))))

(eval (compile (read (+ "(ir::function ()(ir::block " (init) "))" ))))

(defun main ()
  (let ((scripts (.getElementsByTagName document "script")))
    (for ((i 0) (< i (.-length scripts)) (set i (+ i 1)))
	 (when (eql "text/lisp" (.-type (nth scripts i)))
	   (let ((src (.-innerHTML (nth scripts i))))
	     (eval (+ (compile (read (+ "(ir::function () (ir::block " src "))"))) ";")))))))
(main)
