/// <reference path="./.sst/platform/config.d.ts" />

const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
} = process.env;

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
    const openaiApiKey = new sst.Secret('OPENAI_API_KEY');

    const publicBucket = new sst.aws.Bucket('GbboPublic', {
      access: 'public',
    });
    new sst.aws.Nextjs('MyWeb', {
      link: [
        publicBucket,
        databaseUrl,
        supabaseCert,
        openaiApiKey,
      ],
      // These are not secret values, and they need to be accessible by the NextJS edge runtime (no SST access)
      environment: {
        SUPABASE_ANON_KEY: SUPABASE_ANON_KEY!,
        SUPABASE_URL: SUPABASE_URL!,
      },
    });
  },
});
