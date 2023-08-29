new Vue({
    el: '#app',
    data: {
        posts: [],
        page:1,
        perPage: 6,
        pages: [],
        newtitle: '',
        newbody: ''
    },
    methods: {
        getPosts() {
        axios
            .get('https://jsonplaceholder.typicode.com/posts?_limit=20')
            .then(response => (this.posts = response.data));
        },

        paginate (posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return posts.slice(from, to);
        },
        buttonClick(){
            let newId = this.posts.length;
            let newPost = {
                'userId': 1,
                'id': newId++,
                'title': this.newtitle,
                'body': this.newbody
            };

            this.posts.push(newPost);
        }
        
    },

    computed: {
        displayedPosts () {
            return this.paginate(this.posts);
        },
        setPages () {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
    },

    watch: {
        posts () {
            this.setPages();
        }
    },
    
    created () {
        this.getPosts();
    }
});