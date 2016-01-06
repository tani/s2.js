(ir::include "src/libstd.l")
(ir::include "src/compile.l")
(ir::include "src/include.l")

(def macros (hash))

(defun precompile (exp)
  (cond 
    ((or (not (.isArray Array exp))
	 (eql (.-length exp) 0))
     (return-from precompile exp))
    ((eql (nth exp 0) "ir::quote")
     (return-from precompile exp))
    ((eql (nth exp 0) "ir::backquote")
     (return-from precompile
       (preMacroExpand exp)))
    ((eql (nth exp 0) "ir::defmacro")
     (let ((name (nth exp 1))
	   (args (nth exp 2))
	   (body (.map (.slice exp 3) (lambda (e)(return (compile (precompile e)))))))
       (let ((macro (+ "(function(" (.join args ",") "){\n"
		       (.join body ";\n") ";\n})")))
	 (set (nth macros name) (eval macro))
	 (return-from precompile
	   (+ "/** MACRO: " name "\n" macro "\n **/")))))
    ((eql (nth exp 0) "ir::include")
     (let ((module (.map (include (nth exp 1)) precompile)))
       (if (eql 0 (.-length module))
	   (return-from precompile "")
	   (return-from precompile
	     `(ir::block ,(+ "/**"(nth exp 1)"**/") ,@module)))))
    ((member (nth exp 0) macros)
     (return-from precompile
       (precompile (.apply (nth macros (nth exp 0)) this (.slice exp 1)))))
    (true (return-from precompile (.map exp precompile)))))

(defun preMacroExpand (exp)
  (cond ((not (.isArray Array exp))
	 (return-from preMacroExpand exp))
	((eql (.-length exp) 0)
	 (return-from preMacroExpand exp))
	((and (.isArray Array (nth exp 0))
	      (eql (nth (nth exp 0) 0) "ir::unquote"))
	 (return-from preMacroExpand
	   (.concat `((,@(list 'ir::unquote) ,(precompile (nth (nth exp 0) 1))))
		    (preMacroExpand (.slice exp 1)))))
	((and (.isArray Array (nth exp 0))
	      (eql (nth (nth exp 0) 0) "ir::splice"))
	 (return-from preMacroExpand
	   (.concat `((,@(list 'ir::splice) ,(precompile (nth (nth exp 0) 1))))
		    (preMacroExpand (.slice exp 1)))))
	(true (return-from preMacroExpand
		(.concat (list (preMacroExpand (nth exp 0)))
			 (preMacroExpand (.slice exp 1)))))))

