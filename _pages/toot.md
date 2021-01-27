---
layout: page
title: Այցելուներ
permalink: /այցելուներ
comments: false
---

<div id="toot"></div>
<style>
	.toot-wrapper {
		font-size: 13px;
		padding-bottom: 14px;
		margin-bottom: 30px;
	}
	.toot-wrapper p {
		margin: 0 !important;
	}
	.toot-wrapper br{
		display: none;
	}
	.toot-attachments {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		width: 100%;
		overflow: auto;
	}
	.toot-attachment {
		flex: 1;
		max-width: 200px;
		margin-top: 10px;
		margin-right: 10px;
		border-radius: 4px;
	}
	.toot-author {
		line-height: 1;
		font-weight: 700;
		padding-bottom: 5px;
	}
	.toot-avatar {
		float: left;
		width: 48px;
		height: 48px;
		margin-right: 15px;
		border-radius: 4px;
	}
</style>
<script>
	fetch("https://թութ.հայ/api/v1/timelines/tag/զնին")
	.then((response) => response.json())
	.then((response) => {
		var html = '';
		response.forEach(item => {
			if(item.in_reply_to_id) return null;
			var attachments = item.media_attachments.map((attachment) => 
				`<img class="toot-attachment" src="${attachment.preview_url}">`
			);
			html += `
			<div class="toot-wrapper">
				<img class="toot-avatar" src="${item.account.avatar}" />
				<div class="toot-author">@${item.account.username}</div>
				${item.content}
				<div class="toot-attachments">
					${attachments.join("")}
				</div>
			</div>`;
		})
		toot.innerHTML = html;
	})
</script>
