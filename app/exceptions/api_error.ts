const errors = {
  'Invalid relation': {
    code: 2000,
    message: 'Relation "{{params}}" does not exist',
  },
}
export default class ApiException {
  error: string
  error_code: number
  message: string

  constructor(error: string, params?: any) {
    this.error = error
    this.message = errors[error as keyof typeof errors].message.replace('{{params}}', params)
    this.error_code = errors[error as keyof typeof errors].code
  }
}
