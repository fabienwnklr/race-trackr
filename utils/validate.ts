type SqlOperator = '=' | '!=' | '<>' | '>=' | '>' | '<=' | '<' | 'LIKE' | 'ILIKE'
type SqlType = 'int' | 'string' | 'float' | 'boolean'

interface Condition {
  field: string
  operator: SqlOperator
  value: any
  type: SqlType
}

function isValidSqlCondition(condition: Condition): boolean {
  const { field, operator, value, type } = condition

  // Validate operator
  const validOperators: SqlOperator[] = ['=', '!=', '<>', '>=', '>', '<=', '<', 'LIKE', 'ILIKE']
  if (!validOperators.includes(operator)) {
    console.error(`Invalid operator: ${operator}`)
    return false
  }

  // Validate value type
  const isValidType = (mvalue: any, mtype: SqlType): boolean => {
    switch (mtype) {
      case 'int':
        return Number.isInteger(mvalue)
      case 'float':
        return typeof mvalue === 'number' && !Number.isNaN(mvalue)
      case 'string':
        return typeof mvalue === 'string'
      case 'boolean':
        return typeof mvalue === 'boolean'
      default:
        console.error(`Unknown type: ${mtype}`)
        return false
    }
  }

  if (!isValidType(value, type)) {
    console.error(`Value type mismatch: expected ${type}, got ${typeof value}`)
    return false
  }

  // Additional checks for LIKE and ILIKE
  if ((operator === 'LIKE' || operator === 'ILIKE') && type !== 'string') {
    console.error(`Operator ${operator} requires type 'string', but got ${type}`)
    return false
  }

  return true
}

// Example usage
const conditions: Condition[] = [
  { field: 'id', operator: '=', value: 123, type: 'int' },
  { field: 'name', operator: 'ILIKE', value: '%john%', type: 'string' },
  { field: 'price', operator: '>=', value: 19.99, type: 'float' },
  { field: 'isActive', operator: '=', value: true, type: 'boolean' },
  { field: 'createdAt', operator: 'LIKE', value: '%2024%', type: 'string' },
]

conditions.forEach((condition) => {
  console.log(`Condition: ${JSON.stringify(condition)} is valid: ${isValidSqlCondition(condition)}`)
})
