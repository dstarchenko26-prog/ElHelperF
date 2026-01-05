const ERROR_MAPPING = {
  // Вхід
  'Email is already taken': 'errors.auth.email_taken',
  'Token used': 'errors.auth.token_used',
  'Token expired': 'errors.auth.token_expired',
  'The email does not match the token': 'errors.auth.email_neq_token',
  'Account activated': 'errors.auth.account_act',
  'Account is not active': 'errors.auth.account_nact',
  'User is disabled' : 'errors.auth.user_dis',
  
  // Користувач
  'Incorrect current password': 'errors.user.inc_cur_pass',
  'Request already submitted': 'errors.user.req_sub',
  'You cannot archive request': 'errors.user.n_arch_req',
  'Bad credentials': 'errors.user.bad_cred',
  'User already exists': 'errors.user.user_exists',
  'Email already in use': 'errors.auth.email_taken',
  'Validation failed': 'errors.user.valid_failed',

  // Теорія
  'This is not your article' : 'errors.wiki.not_your_article',
  'Parent comment not found': 'errors.wiki.par_comm_nf',
  'You can only delete your own comments': 'errors.wiki.not_your_comm',
  'Category with name already exists': 'errors.wiki.cat_name_exists',

  // Розрахунки
  'This is not your formula': 'errors.calc.not_your_formula',
  'Project is archived. Create a new version to edit': 'errors.calc.project_archived',
  'Cannot update archived project': 'errors.calc.not_upd_arch_project',
  'Cannot delete from archived project': 'errors.calc.not_del_f_arch_project',
  'Project not found or access denied': 'errors.calc.project_nf_ad',

  // Cутності
  'Token not found': 'errors.ent.token_nf',
  'User not found': 'errors.ent.user_nf',
  'Request not found': 'errors.ent.req_nf',
  'Category not found': 'errors.ent.cat_nf',
  'Article not found': 'errors.ent.art_nf',
  'Comment not found': 'errors.ent.comm_nf',
  'Formula not found': 'errors.ent.formula_nf',
  'Project not found': 'errors.ent.project_nf',
  'Calculation not found': 'errors.ent.calc_nf',
  'Access denied': 'errors.ent.access_denied',
};

const STATUS_MAPPING = {
  400: 'errors.status.bad_request',
  401: 'errors.status.unauthorized',
  403: 'errors.status.forbidden',
  404: 'errors.status.not_found_general',
  500: 'errors.status.server_error',
  502: 'errors.status.gateway_error',
  503: 'errors.status.service_unavailable',
};

export const getErrorKey = (error) => {
  if (typeof error === 'string') {
    return ERROR_MAPPING[error] || 'errors.unknown_error';
  }
  if (error.response) {
    const data = error.response.data;
    const status = error.response.status;

    const serverMessage = data?.message || data?.error;
    if (serverMessage && ERROR_MAPPING[serverMessage]) {
      return ERROR_MAPPING[serverMessage];
    }
    
    if (STATUS_MAPPING[status]) {
      return STATUS_MAPPING[status];
    }
  }

  if (error.request) {
    return 'errors.network_error';
  }

  return 'errors.unknown_error';
};