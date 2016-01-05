(ir::include "src/libstd.l")

(defun tokenize (str)
  (let ((op (new (RegExp "(\"(?:\\\\\"|[^\"])*\"|,@|[,'`()]|\\s)"))))
    (defun sub (exp)
      (let ((br (new (RegExp "[^\\s]"))))
	(return-from sub (.test br exp))))
    (return-from tokenize
      (.filter (.split str op) sub))))

(defun read (tokens)
  (let ((result (list)) (cnt 1))
    (while (or (eql (.at tokens 0) "'")
	       (eql (.at tokens 0) "`")
	       (eql (.at tokens 0) ",")
	       (eql (.at tokens 0) ",@"))
      (.push result (.shift tokens)))
    (when (eql (.at tokens 0) "(")
      (.push result (.shift tokens))
      (while (< 0 cnt)
	(.push result (.shift tokens))
	(case (.at result (- (.length result) 1))
	  (("(") (++ cnt))
	  ((")") (-- cnt))))
      (return-from read result))
    (.push result (.shift tokens))
    (return-from read result)))

(defun parse (tokens)
  (when (eql 0 (.length tokens)) (return-from parse (list)))
  (let ((exp (read tokens)))
    (case (.at exp 0)
      (("'")  (return-from parse (.concat `((ir::quote     ,@(parse (.slice exp 1)))) (parse tokens))))
      (("`")  (return-from parse (.concat `((ir::backquote ,@(parse (.slice exp 1)))) (parse tokens))))
      ((",")  (return-from parse (.concat `((,@(list "ir::unquote")   ,@(parse (.slice exp 1)))) (parse tokens))))
      ((",@") (return-from parse (.concat `((,@(list "ir::splice")    ,@(parse (.slice exp 1)))) (parse tokens))))
      (("(")  (return-from parse (.concat (list (parse (.slice exp 1 -1))) (parse tokens))))
      (otherwise (return-from parse (.concat (list (.at exp 0)) (parse tokens)))))))

(defun include (file)
  (let ((fs (require 'fs)))
    (let ((src (.readFileSync fs (.slice file 1 -1) 'utf-8)))
      (return-from include (parse (tokenize src))))))

(def macros (hash))
(defun generateJS (exp)
  (unless (.isArray Array exp)
    (return-from generateJS exp))
  (if (eql 'string (typeof (.at exp 0)))
      (def func (.replace (.at exp 0) (new (RegExp "ir::")) ""))
      (def func (generateJS (.at exp 0))))
  (case (.at exp 0)
    ((undefined) (return-from generateJS (list)))
    (("ir::function" "ir::function*")
     (let ((args (.map (.at exp 1) generateJS))
	   (statement (generateJS (.at exp 2))))
       (return-from generateJS
	 (+ "(" func "(" (.join args ",") ")" statement ")"))))
    (("ir::var" "ir::let" "ir::const")
     (let ((variable (generateJS (.at exp 1)))
	   (value    (generateJS (.at exp 2))))
       (return-from generateJS
	 (+ func " " variable " = " value))))
    (("ir::if")
     (if (eql (.length exp) 4)
	 (let ((condition (generateJS (.at exp 1)))
	       (statement1 (generateJS (.at exp 2)))
	       (statement2 (generateJS (.at exp 3))))
	   (return-from generateJS
	     (+ "if(" condition ")" statement1 "else" statement2)))
	 (let ((condition (generateJS (.at exp 1)))
	       (statement (generateJS (.at exp 2))))
	   (return-from generateJS
	     (+ "if(" condition ")" statement)))))
    (("ir::do")
     (let ((statement (generateJS (.at exp 1)))
	   (condition (generateJS (.at exp 3))))
       (return-from generateJS
	 (+ "do" statement "while(" condition ")"))))
    (("ir::for")
     (let ((init (generateJS (.at exp 1)))
	   (condition (generateJS (.at exp 2)))
	   (final (generateJS (.at exp 3)))
	   (statement (generateJS (.at exp 4))))
       (return-from generateJS
	 (+ "for(" init ";" condition ";" final")" statement))))
    (("ir::while")
     (let ((condition (generateJS (.at exp 1)))
	   (statement (generateJS (.at exp 2))))
       (return-from generateJS
	 (+ "while(" condition ")" statement))))
    (("ir::block")
     (let ((statements (.map (.slice exp 1) generateJS)))
       (return-from generateJS
	 (+ "{\n" (.join statements ";\n") ";\n}"))))
    (("ir::named-block")
     (let ((tag (generateJS (.at exp 1)))
	   (statements (.map (.slice exp 2) generateJS)))
       (return-from generateJS
	 (+ "{\n"
	    "try{\n" (.join statements ";\n") ";\n}"
	    "catch(err){\n"
	    "if(err === '" tag "'){\n"
	    "return __result__;\n"
	    "}else{\n"
	    "throw err;\n"
	    "}\n}\n}"))))
    (("ir::return-from")
     (let ((tag (generateJS (.at exp 1)))
	   (value (generateJS (.at exp 2))))
       (return-from generateJS
	 (+ "__result__ = " value ";throw '" tag"'"))))
    (("ir::return" "ir::break" "ir::continue"
      "ir::yield"  "ir::delete" "ir::typeof")
     (if (eql (.length exp) 1)
	 (return-from generateJS func)
	 (return-from generateJS
	   (+ func " " (generateJS (.at exp 1))))))
    (("ir::instanceof" "ir::in" "ir::===" "ir::=="
      "ir::&&" "ir::||" "ir::+" "ir::-" "ir::*" "ir::/"
      "ir::%"  "ir::>" "ir::>=" "ir::<" "ir::<="
      "ir::<<" "ir::>>" "ir::>>>" "ir::&" "ir::|" "ir::^") 
     (let ((args (.map (.slice exp 1) generateJS)))
       (return-from generateJS
	 (+ "(" (.join args (+ " " func " ")) ")"))))
    (("ir::++" "ir::--")
     (let ((obj (generateJS (.at exp 1))))
       (return-from generateJS (+ func obj))))
    (("ir::!" "ir::~" "ir::new")
     (let ((obj (generateJS (.at exp 1))))
       (return-from generateJS (+ func " " obj))))
    (("ir::nth")
     (let ((array (generateJS (.at exp 1)))
	   (key   (generateJS (.at exp 2))))
       (return-from generateJS (+ array "[" key "]"))))
    (("ir::set")
     (let ((variable (generateJS (.at exp 1)))
	   (value    (generateJS (.at exp 2))))
       (return-from generateJS (+ variable " = " value))))
    (("ir::hash")
     (let ((args (.map (.slice exp 1) generateJS))
	   (results (list)))
       (for ((key 0) (< key (.length args)) (set key (+ key 2)))
	    (.push results (+ (.at args key) ":" (.at args (+ key )))))
       (return-from generateJS
	 (+ "{" (.join results " , ") "}"))))
    (("ir::array")
     (let ((array (.map (.slice exp 1) generateJS)))
       (return-from generateJS (+ "[" (.join array " , ") "]"))))
    (("ir::dot")
     (let ((arg (.map (.slice exp 1) generateJS)))
       (return-from generateJS (.join arg "."))))
    (("ir::defmacro")
     (let ((name (generateJS (.at exp 1)))
	   (args (.map (.at exp 2) generateJS))
	   (statements (.map (.slice exp 3) generateJS)))
       (let ((macro (+ "(function(" (.join args ",") "){\n"
		       (.join statements ";\n")";\n})")))
	 (set (.at macros name) (eval macro))
	 (return-from generateJS (+ "/* MACRO: " name "\n" macro "\n */")))))
    (("ir::quote")
     (let ((arg (.at exp 1)))
       (return-from generateJS (.stringify JSON arg))))
    (("ir::backquote")
     (return-from generateJS (+ "[]" (macroExpand (.at exp 1)))))
    (("ir::include")
     (let ((module (generateJS (.at exp 1))))
       (return-from generateJS
	 (+ "/** " module " **/{\n" (.join (.map (include module) generateJS) ";\n") ";\n}"))))
    (otherwise
     (cond ((member (.at exp 0) macros)
	    (return-from generateJS
	      (generateJS (.apply (.at macros (.at exp 0)) this (.slice exp 1)))))
	   ((eql (.at func 0) ".")
	    (let ((variable (generateJS (.at exp 1)))
		  (args (.map (.slice exp 2) generateJS)))
	      (return-from generateJS
		(+ variable func "(" (.join args ",") ")"))))
	   (true
	    (return-from generateJS
	      (+ func "(" (.join (.map (.slice exp 1) generateJS) ",")")")))))))

(defun macroExpand (exp)
  (cond ((not (.isArray Array exp))
	 (return-from macroExpand (+ "'" exp "'")))
	((eql (.length exp) 0)
	 (return-from macroExpand ""))
	((and (.isArray Array (.at exp 0)) (eql (.at (.at exp 0) 0) "ir::unquote"))
	 (return-from macroExpand
	   (+ ".concat([" (generateJS (.at (.at exp 0) 1)) "])"
	      (macroExpand (.slice exp 1)))))
	((and (.isArray Array (.at exp 0)) (eql (.at (.at exp 0) 0) "ir::splice"))
	 (return-from macroExpand
	   (+ ".concat(" (generateJS (.at (.at exp 0) 1)) ")"
	      (macroExpand (.slice exp 1)))))
	(true
	 (if (.isArray Array (.at exp 0))
	     (return-from macroExpand
	       (+ ".concat([[]" (macroExpand (.at exp 0)) "])"
		  (macroExpand (.slice exp 1))))
	     (return-from macroExpand
	       (+ ".concat([" (macroExpand (.at exp 0)) "])"
		  (macroExpand (.slice exp 1))))))))

(defun main ()
  (let ((fs   (require 'fs))
	(file (.at (@ process argv) (- (@ process argv length) 1)))
	(config "#!/usr/bin/env node\n"))
    (let ((lisp (.readFileSync fs file 'utf-8)))
      (let ((js (generateJS `((ir::function () (ir::block ,@(parse (tokenize lisp))))))))
	(.log console (+ config js))))))

(main)
