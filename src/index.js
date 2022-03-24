//插件编写：实现一个Babel计算器插件，用以改善原生JavaScript中浮点数精度丢失的现象，以实现低精度下的精准计算


module.exports = ({ types: t }) => {
    return {
        visitor: {
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
            }
        }
    }
}