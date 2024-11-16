/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'gbbo',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },

  async run() {
    const databaseUrl = new sst.Secret('DatabaseUrl');

    const supabaseCert = new sst.Secret('SupabaseCert');

    const publicBucket = new sst.aws.Bucket('GbboPublic', {
      access: 'public',
    });

    new sst.aws.Nextjs('MyWeb', {
      link: [
        publicBucket,
        databaseUrl,
        supabaseCert,
      ],
    });

  },
});
