import router from 'reactor/router';
import { Obj } from 'reinforcements';
import Guardian from 'modules/admin/users/middleware/guardian';
import PermissionGranted from 'modules/admin/users/middleware/PermissionGranted';
import DashboardLayout from 'reactor/layout/components/AdminDashboard/DashboardLayout';

export default function adminRoutes(groupOptions) {
    router.group(Obj.merge({
        middleware: [Guardian, PermissionGranted],
        layout: DashboardLayout,
    }, groupOptions));
}