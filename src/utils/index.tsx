import moment from "moment";

export function parseURL(url: string) {
    const trimmedURL = url.replace("https://l2.dropspoil.com/npc", "");
    const cleanedURL = trimmedURL.replace(".html", "");

    const parts = cleanedURL.split('/').filter(el=> el.length > 0);
    const rb_id = parseInt(parts[0], 10);
    const rb_hash = parts.slice(1).join('-');

    const result = { rb_id, rb_hash };
    return result;
}


export function calculateTimeRemaining(eventDate: moment.Moment) {
    const now = moment();
    const targetDate = moment(eventDate);

    if (now.isAfter(targetDate)) {
        return "Expired";
    }

    const duration = moment.duration(targetDate.diff(now));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) % 60;

    return `${hours === 0 ? '' : hours+' '+'hours'} ${minutes} minutes`;
}


export function replaceNpcWithLoc(url: string) {
    return url.replace("/npc/", "/loc/");
}