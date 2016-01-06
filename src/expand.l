(ir::include "src/libstd.l")
(ir::include "src/compile.l")

(defun macroExpand (exp)
  (cond ((not (.isArray Array exp))
	 (return-from macroExpand (+ "'" exp "'")))
	((eql (.-length exp) 0)
	 (return-from macroExpand ""))
	((and (.isArray Array (nth exp 0)) (eql (nth (nth exp 0) 0) "ir::unquote"))
	 (return-from macroExpand
	   (+ ".concat([" (compile (nth (nth exp 0) 1)) "])"
	      (macroExpand (.slice exp 1)))))
	((and (.isArray Array (nth exp 0)) (eql (nth (nth exp 0) 0) "ir::splice"))
	 (return-from macroExpand
	   (+ ".concat(" (compile (nth (nth exp 0) 1)) ")"
	      (macroExpand (.slice exp 1)))))
	(true
	 (if (.isArray Array (nth exp 0))
	     (return-from macroExpand
	       (+ ".concat([[]" (macroExpand (nth exp 0)) "])"
		  (macroExpand (.slice exp 1))))
	     (return-from macroExpand
	       (+ ".concat([" (macroExpand (nth exp 0)) "])"
		  (macroExpand (.slice exp 1))))))))
