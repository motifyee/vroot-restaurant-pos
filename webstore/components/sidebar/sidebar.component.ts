import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	HostBinding,
	inject,
	OnInit,
	Output,
	signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { slideInOut } from '@webstore/animations/slide-in-out.animation';
import { userStore } from '@webstore/state';
import { webstorePaths } from '@webstore/webstore.routes';

interface MenuLink {
	label: string;
	url?: string;
	auth?: boolean;
	action?: () => void;
}
@Component({
	selector: 'sidebar',
	imports: [CommonModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
	host: { class: 'popup' },
	animations: [slideInOut],
})
export class SidebarComponent implements OnInit {
	@HostBinding('@slideInOut') slideInOutAnimation = true;

	@Output() onDismiss = new EventEmitter<void>();

	user = inject(userStore);
	isLoggedin = this.user.isLoggedIn;

	router = inject(Router);

	menuLinks = signal<MenuLink[]>([
		{ label: 'الصفحة الرئيسية', url: webstorePaths.home },
		{ label: 'حسابي', url: webstorePaths.account, auth: true },
		{ label: 'الطلبات', url: webstorePaths.orders },
		{ label: 'الفروع', url: webstorePaths.branches },
		{ label: 'طلبك كالعادة', url: webstorePaths.usuals, auth: true },
		{ label: 'اتصل بنا', url: webstorePaths.callUs },
		{ label: 'عناويني', action: () => {} },
		{ label: 'English', action: () => {} },
	]);

	onLinkClick(link: MenuLink) {
		if (link.url) this.router.navigate([link.url]);

		link.action?.();

		this.onDismiss.emit();
	}

	ngOnInit(): void {
		if (this.user.isLoggedIn()) return;

		this.menuLinks.update((links) => links.filter((l) => !l.auth));
	}
}
