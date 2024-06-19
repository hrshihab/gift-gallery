import { TMenuItem, TUserPath } from "../types";

export const sideBarItemsGenerator = (items: TUserPath[], role: string) => {
    const sidebarItems = items.reduce((acc: TMenuItem[], item) => {
        if (item.path && item.name) {
            acc.push({
                name: item.name,
                path: `/${role}/${item.path}`,
                icon: item?.icon,
            });
        }

        return acc;
    }, []);

    return sidebarItems;
};
