 //插件编写：实现一个Babel计算器插件，用以改善原生JavaScript中浮点数精度丢失的现象，以实现低精度下的精准计算


 let hasGetMulti = false,
     addInjected = false,
     minusInjected = false,
     multiInjected = false,
     divInjected = false;

 let flag1 = true,
     flag2 = true,
     flag3 = true;


 module.exports = ({ types: t }) => {
     return {
         visitor: {
             //Babel计算器的实现
             BinaryExpression(path, state) {
                 if (state.opts.calculatorCompile == true) {
                     let pPath = path.findParent((path) => t.isProgram(path.node))
                     const node = path.node;


                     let leftNode = path.node.left;
                     let leftValue = leftNode.value;
                     let rightNode = path.node.right;
                     let rightValue = rightNode.value;
                     //判断表达式两边是否为数字
                     if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
                         if (!hasGetMulti) {
                             pPath.get('body.0').insertBefore(
                                 t.functionDeclaration(
                                     t.identifier("_getMulti"), [t.identifier("arg1"), t.identifier("arg2")],
                                     t.blockStatement([
                                         t.variableDeclaration("let", [t.variableDeclarator(t.identifier("multi1"))]),
                                         t.variableDeclaration("let", [t.variableDeclarator(t.identifier("multi2"))]),
                                         t.forStatement(
                                             t.assignmentExpression("=", t.identifier("multi1"), t.numericLiteral(1)),
                                             t.binaryExpression("<", t.identifier("multi1"), t.identifier("Infinity")),
                                             t.assignmentExpression(
                                                 "=",
                                                 t.identifier("multi1"),
                                                 t.binaryExpression("*",
                                                     t.identifier("multi1"),
                                                     t.numericLiteral(10)
                                                 )
                                             ),
                                             t.blockStatement([
                                                 t.ifStatement(
                                                     t.binaryExpression("===",
                                                         t.binaryExpression("%",
                                                             t.BinaryExpression("*",
                                                                 t.identifier("arg1"),
                                                                 t.identifier("multi1")
                                                             ),
                                                             t.numericLiteral(1)
                                                         ),
                                                         t.numericLiteral(0)
                                                     ),
                                                     t.blockStatement([
                                                         t.breakStatement()
                                                     ], [])
                                                 )
                                             ], [])
                                         ),
                                         t.forStatement(
                                             t.assignmentExpression("=", t.identifier("multi2"), t.numericLiteral(1)),
                                             t.binaryExpression("<", t.identifier("multi2"), t.identifier("Infinity")),
                                             t.assignmentExpression(
                                                 "=",
                                                 t.identifier("multi2"),
                                                 t.binaryExpression("*",
                                                     t.identifier("multi2"),
                                                     t.numericLiteral(10)
                                                 )
                                             ),
                                             t.blockStatement([
                                                 t.ifStatement(
                                                     t.binaryExpression("===",
                                                         t.binaryExpression("%",
                                                             t.BinaryExpression("*",
                                                                 t.identifier("arg2"),
                                                                 t.identifier("multi2")
                                                             ),
                                                             t.numericLiteral(1)
                                                         ),
                                                         t.numericLiteral(0)
                                                     ),
                                                     t.blockStatement([
                                                         t.breakStatement()
                                                     ], [])
                                                 )
                                             ], [])
                                         ),
                                         t.returnStatement(
                                             t.conditionalExpression(
                                                 t.binaryExpression(">",
                                                     t.identifier("multi1"),
                                                     t.identifier("multi2")
                                                 ),
                                                 t.identifier("multi1"),
                                                 t.identifier("multi2")
                                             )
                                         )
                                     ], [])
                                 ));
                             hasGetMulti = true;
                             pPath.get('body.0').node.leadingComments = [{ type: "CommentBlock", value: "*\n * This function calculates the multiples of two numbers .\n * @param {number, number} input any number\n * @returns {number} the multiples of two numbers.\n " }]
                         }


                         switch (node.operator) {
                             case "+":
                                 if (!addInjected) {
                                     addInjected = true;
                                     pPath.get('body.0').insertBefore(t.functionDeclaration(
                                         t.identifier("_cstmAdd"), [t.identifier("arg1"), t.identifier("arg2")],
                                         t.blockStatement([
                                             t.variableDeclaration("let", [t.variableDeclarator(
                                                 t.identifier("multi"),
                                                 t.callExpression(
                                                     t.identifier("_getMulti"), [
                                                         t.identifier("arg1"),
                                                         t.identifier("arg2")
                                                     ]
                                                 )
                                             )]),
                                             t.returnStatement(
                                                 t.binaryExpression("/",
                                                     t.binaryExpression("+",
                                                         t.binaryExpression("*",
                                                             t.identifier("arg1"),
                                                             t.identifier("multi")
                                                         ),
                                                         t.binaryExpression("*",
                                                             t.identifier("arg2"),
                                                             t.identifier("multi")
                                                         )
                                                     ),
                                                     t.identifier("multi")
                                                 )
                                             )
                                         ], [])
                                     ))
                                     pPath.get('body.0').node.leadingComments = [{ type: "CommentBlock", value: "*\n * This function calculates  the sum of two numbers .\n * @param {number, number} input any number\n * @returns {number} the sum of two numbers.\n " }]
                                 }
                                 path.replaceWith(
                                     t.callExpression(
                                         t.identifier("_cstmAdd"), [
                                             t.numericLiteral(leftValue),
                                             t.numericLiteral(rightValue)
                                         ]
                                     )
                                 )

                                 break
                             case "-":
                                 if (!minusInjected) {
                                     minusInjected = true;
                                     pPath.get('body.0').insertBefore(t.functionDeclaration(
                                         t.identifier("_cstmMinus"), [t.identifier("arg1"), t.identifier("arg2")],
                                         t.blockStatement([
                                             t.variableDeclaration("let", [t.variableDeclarator(
                                                 t.identifier("multi"),
                                                 t.callExpression(
                                                     t.identifier("_getMulti"), [
                                                         t.identifier("arg1"),
                                                         t.identifier("arg2")
                                                     ]
                                                 )
                                             )]),
                                             t.returnStatement(
                                                 t.binaryExpression("/",
                                                     t.binaryExpression("-",
                                                         t.binaryExpression("*",
                                                             t.identifier("arg1"),
                                                             t.identifier("multi")
                                                         ),
                                                         t.binaryExpression("*",
                                                             t.identifier("arg2"),
                                                             t.identifier("multi")
                                                         )
                                                     ),
                                                     t.identifier("multi")
                                                 )
                                             )
                                         ], [])
                                     ))
                                     pPath.get('body.0').node.leadingComments = [{ type: "CommentBlock", value: "*\n * This function calculates  the difference of two numbers .\n * @param {number, number} input any number\n * @returns {number} the difference of two numbers.\n " }]
                                 }
                                 path.replaceWith(
                                     t.callExpression(
                                         t.identifier("_cstmMinus"), [
                                             t.numericLiteral(leftValue),
                                             t.numericLiteral(rightValue)
                                         ]
                                     )
                                 )

                                 break
                             case "*":
                                 if (!multiInjected) {
                                     multiInjected = true;
                                     pPath.get('body.0').insertBefore(t.functionDeclaration(
                                         t.identifier("_cstmMulti"), [t.identifier("arg1"), t.identifier("arg2")],
                                         t.blockStatement([
                                             t.variableDeclaration("let", [t.variableDeclarator(
                                                 t.identifier("multi"),
                                                 t.callExpression(
                                                     t.identifier("_getMulti"), [
                                                         t.identifier("arg1"),
                                                         t.identifier("arg2")
                                                     ]
                                                 )
                                             )]),
                                             t.returnStatement(
                                                 t.binaryExpression("/",
                                                     t.binaryExpression("*",
                                                         t.binaryExpression("*",
                                                             t.identifier("arg1"),
                                                             t.identifier("multi")
                                                         ),
                                                         t.binaryExpression("*",
                                                             t.identifier("arg2"),
                                                             t.identifier("multi")
                                                         )
                                                     ),
                                                     t.binaryExpression("*",
                                                         t.identifier("multi"),
                                                         t.identifier("multi")
                                                     )
                                                 )
                                             )
                                         ], [])
                                     ))
                                     pPath.get('body.0').node.leadingComments = [{ type: "CommentBlock", value: "*\n * This function calculates  the product of two numbers .\n * @param {number, number} input any number\n * @returns {number} the product of two numbers.\n " }]
                                 }
                                 path.replaceWith(
                                     t.callExpression(
                                         t.identifier("_cstmMulti"), [
                                             t.numericLiteral(leftValue),
                                             t.numericLiteral(rightValue)
                                         ]
                                     )
                                 )

                                 break
                             case "/":
                                 if (!divInjected) {
                                     divInjected = true;
                                     pPath.get('body.0').insertBefore(t.functionDeclaration(
                                         t.identifier("_cstmDiv"), [t.identifier("arg1"), t.identifier("arg2")],
                                         t.blockStatement([
                                             t.variableDeclaration("let", [t.variableDeclarator(
                                                 t.identifier("multi"),
                                                 t.callExpression(
                                                     t.identifier("_getMulti"), [
                                                         t.identifier("arg1"),
                                                         t.identifier("arg2")
                                                     ]
                                                 )
                                             )]),
                                             t.returnStatement(
                                                 t.binaryExpression("/",
                                                     t.binaryExpression("*",
                                                         t.identifier("arg1"),
                                                         t.identifier("multi")
                                                     ),
                                                     t.binaryExpression("*",
                                                         t.identifier("arg2"),
                                                         t.identifier("multi")
                                                     )
                                                 )
                                             )
                                         ], [])
                                     ))
                                     pPath.get('body.0').node.leadingComments = [{ type: "CommentBlock", value: "*\n * This function calculates  the quotient of two numbers .\n * @param {number, number} input any number\n * @returns {number} the quotient of two numbers.\n " }]
                                 }
                                 path.replaceWith(
                                     t.callExpression(
                                         t.identifier("_cstmDiv"), [
                                             t.numericLiteral(leftValue),
                                             t.numericLiteral(rightValue)
                                         ]
                                     )
                                 )

                                 break
                         }
                     }
                 }
             },

             //箭头函数编译为普通函数。
             ArrowFunctionExpression(path, state) {
                 if (state.opts.ArrowFunctionCompile == true) {
                     let newBlc;

                     if (t.isBlockStatement(path.node.body)) {
                         //单语句无大括号
                         newBlc = path.node.body;
                     } else {
                         //有大括号
                         newBlc = t.blockStatement(
                             [t.returnStatement(path.node.body)], [])
                     }
                     let newFuncNode = t.functionExpression(
                         t.identifier(''),
                         path.node.params,
                         newBlc
                     )

                     //this替换为_this
                     const subVisitor01 = {
                         ThisExpression(subPath) {
                             path.scope.parent.push({ id: t.identifier("_this"), init: t.thisExpression() });
                             subPath.replaceWith(t.identifier("_this"))
                         }
                     }

                     path.traverse(subVisitor01);
                     path.replaceWith(newFuncNode);
                 }

             },

             //let编译为var要注意的几点：可能存在的块级作用域消失带来的变量重名问题，暂时性死区问题(?)，for循环的匿名自执行函数问题

             VariableDeclaration(path, state) {
                 if (state.opts.letCompile == true) {
                     const { node, parent, scope } = path;
                     // 改名                              
                     if (path.node.kind == 'let') { path.node.kind = 'var' }
                 }

             },

             ForStatement(path, state) {
                 if (state.opts.letCompile == true) { //如果块作用域中的变量被内部函数引用，即存在闭包，则给当前代码套一层匿名自执行函数

                     //先判断是否是块级作用域

                     let vrbDclNode = path.node.init;

                     if (t.isVariableDeclaration(path.node.init)) {
                         if (vrbDclNode.kind == 'let') {
                             let mainBody = path.node.body;
                             path.get('body').replaceWith(t.blockStatement(
                                 [t.expressionStatement(t.callExpression(
                                     t.functionExpression(t.identifier(''), [],
                                         mainBody), []
                                 ))], []
                             ))

                         }
                     }

                     //如果不存在闭包，则判断是否重名，若重名则重命名当前声明的变量名和子作用域下的引用变量名
                     //这里简化操作，直接改名
                     let variNames = [];

                     try {
                         for (let declaration of vrbDclNode.declarations) {
                             let vrbDclNodeId = declaration.id
                             variNames.push(vrbDclNodeId.name)
                         }

                         for (let variName of variNames) {
                             path.scope.rename(variName)
                         }
                     } catch {}
                 }
             },

             //数组方法polyfill
             MemberExpression(path, state) {
                 if (state.opts.arrayAPICompile == true) {
                     function addAPISource(sourceCode) {
                         let topPath = path.findParent((path) => t.isProgram(path.node));
                         let testNode = t.expressionStatement(
                             t.assignmentExpression('=',
                                 path.scope.generateUidIdentifier("test"),
                                 path.scope.generateUidIdentifier("test")
                             )
                         )

                         let bodyFirstNodePath = topPath.get('body.0');

                         bodyFirstNodePath.insertBefore(testNode);
                         bodyFirstNodePath = topPath.get('body.0');
                         bodyFirstNodePath.replaceWithSourceString(sourceCode);
                         let replacedNodePath = topPath.get('body.0');
                         return replacedNodePath;
                     }

                     if (path.get('property').node.name == 'forEach' && flag1) {
                         path.get('property').node.name = 'myForEach';
                         flag1 = false;
                         let arrAPISourceString = `Array.prototype.myForEach = async function (fn, context = null) {
                         let index = 0;
                         let arr = this;
                         if (typeof fn !== 'function') {
                             throw new TypeError(fn + ' is not a function');
                         }
                         while (index < arr.length) {
                             if (index in arr) {
                                 try {
                                     await fn.call(context, arr[index], index, arr);
                                 } catch (e) {
                                     console.log(e);
                                 }
                             }
                             index ++;
                         }
                     }`;
                         addAPISource(arrAPISourceString).node.leadingComments = [{ type: "CommentBlock", value: "*\n * This method Executes the given function once on each element of the array .\n * @param {function}[context = null] input callback function .\n * @returns {array} the new array after each element of the original array executes the callback function.\n " }]
                     } else if (path.get('property').node.name == 'filter' && flag2) {
                         path.get('property').node.name = 'myFilter';
                         flag2 = false;
                         let arrAPISourceString = `Array.prototype.myFilter = function (fn, context = null) {
                             let arr = this;
                             let len = arr.length;
                             let index = 0, k = 0;
                             let newArr = [];
                             if (typeof fn !== 'function') {
                                 throw new TypeError(fn + ' is not a function');
                             }
                             while (index < len) {
                                 if (index in arr) {
                                     let result = fn.call(context, arr[index], index, arr);
                                     if (result) newArr[k++] = arr[index]; // 如果返回值为真，就添加进新数组
                                 }
                                 index ++;
                             }
                             return newArr;
                         }`;
                         addAPISource(arrAPISourceString).node.leadingComments = [{ type: "CommentBlock", value: "*\n * This method is used to select an array that meets the requirements depending on the function passed in .\n * @param {function}[context = null] input callback function .\n * @returns {array} a new array of elements that can make the callback return true .\n " }]
                     } else if (path.get('property').node.name == 'find' && flag3) {
                         path.get('property').node.name = 'myFind';
                         flag3 = false;
                         let arrAPISourceString = `Array.prototype.myFind = function (fn, context = null) {
                         let arr = this;
                         let len = arr.length;
                         let index = 0, k = 0;
                         let targetValue;
                         if (typeof fn !== 'function') {
                             throw new TypeError(fn + ' is not a function');
                         }
                         while (index < len) {
                             if (index in arr) {
                                 let result = fn.call(context, arr[index], index, arr);
                                 if (result) targetValue = arr[index];
                                 break; // 如果返回值为真，就添加进新数组
                             }
                             index++;
                         }
                         return targetValue;
                     }`;
                         addAPISource(arrAPISourceString).node.leadingComments = [{ type: "CommentBlock", value: "*\n * This method is used to select an value that meets the requirements firstly depending on the function passed in .\n * @param {function}[context = null] input callback function .\n * @returns {array} the first value in the array that can make the callback return true .\n " }]
                     }
                 }
             }
         }
     }
 }