const { defineConfig } = require('@vue/cli-service')
module.exports = {
    devServer: {
        proxy: {
            '/api': { //����·���ؼ���
                target: 'http://localhost:2345', //��Ӧ�Լ��Ľӿ�
                changeOrigin: true,//�Ƿ��������,�ڱ��ػᴴ��һ���������ˣ�Ȼ������������ݣ�
                // ��ͬʱ������������ݣ���������˺ͷ���˽������ݵĽ����Ͳ����п�������
                ws: true,
                pathRewrite: {
                    '^/api': ''      //���������á�/api������target����ĵ�ַ��������������ǵ��ӿ�ʱֱ����api����
                    // ������Ҫ����'http://localhost:8024/management/user/add'��ֱ��д��/api/user/add������
                }
            }
        }
    }
    // lintOnSave: false // ȡ�� eslint ��֤
}
