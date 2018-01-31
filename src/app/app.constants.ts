export class Constants {
    public static get URL(): string { return "https://eatsyd-test.herokuapp.com"; };
    // public static get URL(): string { return "https://vintage-server.herokuapp.com"; };    
    public static get OmiseKey(): any {
        let key = {
            'publicKey': 'pkey_test_5asc1ucstk1imcxnhy7',
            'secretKey': 'skey_test_5asc1uct2yat7bftf3j'
        };
        return key;
    };
}