import https from 'https';

export default function ({ app, $axios, $toast }, inject) {
  const agent = new https.Agent({ rejectUnauthorized: false });

  $axios.setBaseURL(process.env.API_URL);

  $axios.onError((err) => {
    if (err.response.status === 403) {
      $toast.error('Error: Unauthorized');
    } else if (err.response.status === 400) {
      $toast.error(
        `Error: ${err.response.data.message}`
      );
    } else if (err.response.status === 500) {
      $toast.error(
        `Error: ${app.i18n.t('serverError')}`
      );
    }
  });

  $axios.onRequest((config) => {
    if (process.env.dev) { config.httpsAgent = agent; }
  })
}
