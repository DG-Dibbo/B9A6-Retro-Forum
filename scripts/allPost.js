const searchBtn = document.getElementById('btn-search')
const commentSectionLeft = document.getElementById('comment-section-left');
const titleText = document.getElementById('title-content');
let countMarkRead = 0;
const loadAllPosts = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    const posts = data.posts;
    CommentLeftSection(posts);
}
loadAllPosts()
const allPosts = async (searchText) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
    const data = await res.json();
    const postComment = data.posts;
    commentSectionLeft.textContent = '';

    if (!postComment || postComment.length === 0) {
        commentSectionLeft.innerHTML = `
            <div class="text-center py-10 text-gray-500 w-full">
                <p class="text-lg font-semibold">😕 No results found</p>
                <p class="text-sm">Try a different keyword</p>
            </div>
        `;
        return;
    }

    CommentLeftSection(postComment);
};


function searchHandle() {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value.trim();
    // console.log(searchText)
    if (!searchText) {
        loadAllPosts();
        return;
    }
    allPosts(searchText)
}
const CommentLeftSection = (postComment) => {
    commentSectionLeft.textContent = '';
    postComment.forEach(post => {
        const contentSectionLeft = document.getElementById('comment-section-left');
        const commentSectionDiv = document.createElement('div')
        commentSectionDiv.classList = `flex lg:flex-row flex-col justify-start gap-2 mt-10 bg-[#F5E7C6] rounded-lg`;
        commentSectionDiv.innerHTML = `
        <!-- avatar -->
        <div class="avatar-content relative">
        <div class="w-20 h-20 md:w-24 md:h-24 rounded-full">
        <img
        src="${post.image}" class="rounded-full ml-4 mt-2"/>
            </div>
            <div class="avatar-active h-3 w-3 rounded-full absolute lg:left-20 left-18 top-2 ">
            </div>
            </div>

        <!-- text content -->
        <div class="w-full p-4">
            <div class="card-body p-0">
                <div class="flex flex-wrap gap-4 text-sm">
                    <h5>#<span>${post.category}</span></h5>
                    <h5>Author: <span>${post.author.name}</span></h5>
                </div>
                
                <h2 class="card-title text-xl font-bold">
                    ${post.title}
                </h2>

                <p class="text-sm">
                    ${post.description}
                </p>
                </div>

            <hr
                class="border-t-2 border-dotted border-black my-4">

            <div class="flex justify-between items-center">
                <div class="flex gap-6 text-sm">

                    <p><i class="fa-regular fa-envelope mr-1"></i>${post.comment_count}</p>
                    <p><i class="fa-regular fa-eye mr-1"></i>${post.view_count}</p>
                    <p><i class="fa-regular fa-clock mr-1"></i>${post.posted_time}</p>

                </div>

                <button onclick="handleMessage('${post.id}')" class="btn btn-soft btn-accent"><i class="fa-regular fa-envelope "></i></button>
            </div>
            </div>
        
    `;
        contentSectionLeft.appendChild(commentSectionDiv);
        const avatarContentActive = commentSectionDiv.querySelector('.avatar-active')
        if (post.isActive) {
            avatarContentActive.classList.add('bg-green-400')
            avatarContentActive.classList.remove('bg-red-400')
        }
        else {
            avatarContentActive.classList.remove('bg-green-400')
            avatarContentActive.classList.add('bg-red-400')
        }
    });
}
const readPosts = [];

const handleMessage = async (id) => {
    const markRead = document.getElementById('mark-read')
    console.log('handle message', id);
    if (readPosts.includes(id)) {
        const readDiv = document.createElement('div');
        // readDiv.classList = 'text-red-500 font-semibold';
        readDiv.innerHTML = `
            <div role="alert" class="alert alert-error alert-soft">
                <span>This content is read.</span>
            </div>
        `
        // readDiv.textContent = 'This content is read';
        titleText.appendChild(readDiv);
        return;
    }
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?id=${id}`);
    const data = await res.json();
    const post = data.posts.find(p => p.id == id);
    if (!post) return;
    readPosts.push(id)
    console.log(post);
    countMarkRead++;
    markRead.innerText = countMarkRead;
    showTitle(post);
}
const showTitle = (post) => {

    // titleText.textContent = ''; 
    const titleDiv = document.createElement('div');
    titleDiv.classList = 'flex justify-between';
    titleDiv.innerHTML = `
        <div class="card w-96 bg-base-100 card-xs shadow-sm p-4 mb-2">
            <div class="card-body flex flex-row justify-between">
                <p class="single-line-title card-title">${post.title}</p>
                <p class="flex items-center"><i class="fa-regular fa-eye mr-1"></i>${post.view_count || 1568}</p>
                
            </div>
        </div>
        `;
    titleText.appendChild(titleDiv);
}

