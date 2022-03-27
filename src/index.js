//插件编写：实现一个Babel计算器插件，用以改善原生JavaScript中浮点数精度丢失的现象，以实现低精度下的精准计算

const { variableDeclaration } = require("@babel/types");


let i = 1;
let functionNameId;
let functionName;

function convertBlockScopedToVar(
    path,
    node,
    parent,
    scope,
    moveBindingsToParent = false,
) {

    path.node[t.BLOCK_SCOPED_SYMBOL] = true;
    // let 替换为 var
    path.node.kind = "var";

    // 将绑定移到上级函数作用域或者全局作用域（函数作用域不存在的话）
    if (moveBindingsToParent) {
        // 获得函数作用已或者全局作用域
        const parentScope = scope.getFunctionParent() || scope.getProgramParent();

        // 遍历当前块作用域上绑定的变量
        for (const name of Object.keys(path.getBindingIdentifiers())) {
            const binding = scope.getOwnBinding(name);
            if (binding) binding.kind = "var";
            // 移动变量
            scope.moveBindingTo(name, parentScope);
        }
    }
}


module.exports = ({ types: t }) => {
    return {
        visitor: {
            //Babel计算器的实现
            BinaryExpression(path) {
                let pPath = path.findParent((path) => t.isProgram(path.node))
                const node = path.node;
                let hasInjected = false;

                let leftNode = path.node.left;
                let leftValue = leftNode.value;
                let rightNode = path.node.right;
                let rightValue = rightNode.value;
                //判断表达式两边是否为数字
                if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right) && hasInjected == false) {

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
                    pPath.get('body.0').insertBefore(t.functionDeclaration(
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
                    ))

                    switch (node.operator) {
                        case "+":
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

                    hasInjected = true;
                }
            },
            /*
                        VariableDeclarator(path){
                            if(path.node.init.type == "ArrowFunctionExpression"){
                                functionNameId = path.node.id;
                                functionName = functionNameId.name;
                            }
                        },

                        AssignmentExpression(path){
                            if(path.node.right.type == "ArrowFunctionExpression"){
                                functionNameId = path.node.left;
                                functionName = functionNameId.name;
                            }
                        },
            */
            //箭头函数编译为普通函数。要考虑三种情况：参数是否有括号？函数体是否有大括号（是否为单语句返回）？函数体中是否存在this？
            ArrowFunctionExpression(path) {
                let newBlc;

                if (t.isBlockStatement(path.node.body)) {
                    newBlc = path.node.body;
                } else {
                    newBlc = t.blockStatement(
                        [t.returnStatement(path.node.body)], [])
                }
                let newFuncNode = t.functionExpression(
                    t.identifier(''),
                    path.node.params,
                    newBlc
                )

                const subVisitor01 = {
                    ThisExpression(subPath) {
                        path.scope.parent.push({ id: t.identifier("_this"), init: t.thisExpression() });
                        subPath.replaceWith(t.identifier("_this"))
                    }
                }

                path.traverse(newVisitor1);
                path.replaceWith(newFuncNode);
                i++;
            },

            //let编译为var要注意的几点：可能存在的块级作用域消失带来的变量重名问题，暂时性死区问题，for循环的匿名自执行函数问题

            VariableDeclaration(path) {
                const { node, parent, scope } = path;
                // 判断是否是块级作用域                
                // 将块级作用域转换为 var 作用域（即全局或是函数作用域）               
                const subVisitor02 = {
                    BlockScoped(subPath) {
                        convertBlockScopedToVar(path, path.node, parent, scope, true);
                        if (path.node.kind == 'let') { path.node.kind = 'var' }
                    }
                }

                path.traverse(subVisitor02);
            },

            Loop(path) {
                //如果块作用域中的变量被内部函数引用，即存在闭包，则给当前代码套一层匿名自执行函数

                //先判断是否是块级作用域
                if (t.isVariableDeclaration(path.node.init)) {
                    let vrbDclNode = path.node.init;
                    if (vrbDclNode.kind == 'let') {
                        let mainBody = path.node.body;
                        path.get('body').replaceWith(t.blockStatement(
                            [t.expressionStatement(t.callExpression(
                                t.functionExpression(t.identifier(''), [],
                                    mainBody), []
                            ))], []
                        ))
                        return;
                    }
                }

                //如果不存在闭包，则判断是否重名，若重名则重命名当前声明的变量名和子作用域下的引用变量名
                //这里简化操作，直接改名
                let variNames = [];
                for (let declaration in vrbDclNode.declarations) {
                    variNames.push(declaration.id.name)
                }

                for (let variName in variNames) {
                    path.rename(variName)
                }





            }
        }
    }
}