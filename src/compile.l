(ir::include "src/libstd.l")
(ir::include "src/expand.l")
(ir::include "src/include.l")

(def macros (hash))
(defun compile (exp)
  (unless (.isArray Array exp)
    (return-from compile exp))
  (if (eql 'string (typeof (.at exp 0)))
      (def func (.replace (.at exp 0) (RegExp "ir::") ""))
      (def func (compile (.at exp 0))))
  (case (.at exp 0)
    ((undefined) (return-from compile (list)))
    (("ir::function" "ir::function*")
     (let ((args (.map (.at exp 1) compile))
	   (statement (compile (.at exp 2))))
       (return-from compile
	 (+ "(" func "(" (.join args ",") ")" statement ")"))))
    (("ir::var" "ir::let" "ir::const")
     (let ((variable (compile (.at exp 1)))
	   (value    (compile (.at exp 2))))
       (return-from compile
	 (+ func " " variable " = " value))))
    (("ir::if")
     (if (eql (.length exp) 4)
	 (let ((condition (compile (.at exp 1)))
	       (statement1 (compile (.at exp 2)))
	       (statement2 (compile (.at exp 3))))
	   (return-from compile
	     (+ "if(" condition ")" statement1 "else" statement2)))
	 (let ((condition (compile (.at exp 1)))
	       (statement (compile (.at exp 2))))
	   (return-from compile
	     (+ "if(" condition ")" statement)))))
    (("ir::do")
     (let ((statement (compile (.at exp 1)))
	   (condition (compile (.at exp 3))))
       (return-from compile
	 (+ "do" statement "while(" condition ")"))))
    (("ir::for")
     (let ((init (compile (.at exp 1)))
	   (condition (compile (.at exp 2)))
	   (final (compile (.at exp 3)))
	   (statement (compile (.at exp 4))))
       (return-from compile
	 (+ "for(" init ";" condition ";" final")" statement))))
    (("ir::while")
     (let ((condition (compile (.at exp 1)))
	   (statement (compile (.at exp 2))))
       (return-from compile
	 (+ "while(" condition ")" statement))))
    (("ir::block")
     (let ((statements (.map (.slice exp 1) compile)))
       (return-from compile
	 (+ "{\n" (.join statements ";\n") ";\n}"))))
    (("ir::named-block")
     (let ((tag (compile (.at exp 1)))
	   (statements (.map (.slice exp 2) compile)))
       (return-from compile
	 (+ "{\n"
	    "try{\n" (.join statements ";\n") ";\n}"
	    "catch(err){\n"
	    "if(err === '" tag "'){\n"
	    "return __result__;\n"
	    "}else{\n"
	    "throw err;\n"
	    "}\n}\n}"))))
    (("ir::return-from")
     (let ((tag (compile (.at exp 1)))
	   (value (compile (.at exp 2))))
       (return-from compile
	 (+ "__result__ = " value ";throw '" tag"'"))))
    (("ir::return" "ir::break" "ir::continue"
      "ir::yield"  "ir::delete" "ir::typeof")
     (if (eql (.length exp) 1)
	 (return-from compile func)
	 (return-from compile
	   (+ func " " (compile (.at exp 1))))))
    (("ir::instanceof" "ir::in" "ir::===" "ir::=="
      "ir::&&" "ir::||" "ir::+" "ir::-" "ir::*" "ir::/"
      "ir::%"  "ir::>" "ir::>=" "ir::<" "ir::<="
      "ir::<<" "ir::>>" "ir::>>>" "ir::&" "ir::|" "ir::^") 
     (let ((args (.map (.slice exp 1) compile)))
       (return-from compile
	 (+ "(" (.join args (+ " " func " ")) ")"))))
    (("ir::++" "ir::--")
     (let ((obj (compile (.at exp 1))))
       (return-from compile (+ func obj))))
    (("ir::!" "ir::~" "ir::new")
     (let ((obj (compile (.at exp 1))))
       (return-from compile (+ func " " obj))))
    (("ir::nth")
     (let ((array (compile (.at exp 1)))
	   (key   (compile (.at exp 2))))
       (return-from compile (+ array "[" key "]"))))
    (("ir::set")
     (let ((variable (compile (.at exp 1)))
	   (value    (compile (.at exp 2))))
       (return-from compile (+ variable " = " value))))
    (("ir::hash")
     (let ((args (.map (.slice exp 1) compile))
	   (results (list)))
       (for ((key 0) (< key (.length args)) (set key (+ key 2)))
	    (.push results (+ (.at args key) ":" (.at args (+ key )))))
       (return-from compile
	 (+ "{" (.join results " , ") "}"))))
    (("ir::array")
     (let ((array (.map (.slice exp 1) compile)))
       (return-from compile (+ "[" (.join array " , ") "]"))))
    (("ir::dot")
     (let ((arg (.map (.slice exp 1) compile)))
       (return-from compile (.join arg "."))))
    (("ir::defmacro")
     (let ((name (compile (.at exp 1)))
	   (args (.map (.at exp 2) compile))
	   (statements (.map (.slice exp 3) compile)))
       (let ((macro (+ "(function(" (.join args ",") "){\n"
		       (.join statements ";\n")";\n})")))
	 (set (.at macros name) (eval macro))
	 (return-from compile (+ "/* MACRO: " name "\n" macro "\n */")))))
    (("ir::quote")
     (let ((arg (.at exp 1)))
       (return-from compile (.stringify JSON arg))))
    (("ir::backquote")
     (return-from compile (+ "[]" (macroExpand (.at exp 1)))))
    (("ir::include")
     (let ((module (.map (include (compile (.at exp 1))) compile)))
       (if (eql 0 (.length module))
	   (return-from compile "")
	   (return-from compile
	     (+ "/** " (.at exp 1) " **/{\n" (.join module  ";\n") ";\n}")))))
    (otherwise
     (cond ((member (.at exp 0) macros)
	    (return-from compile
	      (compile (.apply (.at macros (.at exp 0)) this (.slice exp 1)))))
	   ((eql (.at func 0) ".")
	    (let ((variable (compile (.at exp 1)))
		  (args (.map (.slice exp 2) compile)))
	      (return-from compile
		(+ variable func "(" (.join args ",") ")"))))
	   (true
	    (return-from compile
	      (+ func "(" (.join (.map (.slice exp 1) compile) ",")")")))))))
