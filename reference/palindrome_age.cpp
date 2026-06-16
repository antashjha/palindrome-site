#include <bits/stdc++.h>
using namespace std;

bool isPalindromePair(int parentAge, int childAge) {
    return (parentAge - childAge) % 9 == 0;
}

int firstPalindromeAge(int gap) {
    return gap / 9;
}

void printPalindromeAges(int childStart, int parentAge, int childAge) {
    int diff = parentAge - childAge;

    vector<string> childSet;
    vector<string> parentSet;

    for (int age = childStart; age < 100; age += 11) {
        int pAge = age + diff;
        if (pAge >= 100) break;

        childSet.push_back(age < 10 ? "0" + to_string(age) : to_string(age));
        parentSet.push_back(pAge < 10 ? "0" + to_string(pAge) : to_string(pAge));
    }

    cout << "\nChild\tParent\n";
    cout << "-----\t------\n";

    for (int i = 0; i < childSet.size(); i++) {
        cout << childSet[i] << "\t" << parentSet[i] << "\n";
    }
}

int main() {
    int parentAge, childAge;

    cout << "Enter Parent age: ";
    cin >> parentAge;
    cout << "Enter Child age: ";
    cin >> childAge;

    if (parentAge <= childAge) {
        cout << "Enter correct parent and child age :)" << endl;
        return 1;
    }

    int gap = parentAge - childAge;

    if (isPalindromePair(parentAge, childAge)) {
        int firstAge = firstPalindromeAge(gap);
        cout << "\nCongrats! You have a palindrome age pair :)" << endl;
        cout << "Age gap: " << gap << endl;
        cout << "First palindrome age of child: " << firstAge << endl;
        printPalindromeAges(firstAge, parentAge, childAge);
    } else {
        cout << "You don't have a palindrome age pair :(" << endl;
    }

    return 0;
}